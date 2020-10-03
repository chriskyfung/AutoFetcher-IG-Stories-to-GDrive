# This file is a fork of https://raw.githubusercontent.com/keithmifsud/jekyll-target-blank/master/lib/jekyll-target-blank.rb by keithmifsud
# MIT License

# frozen_string_literal: true

require "jekyll"
require "nokogiri"
require "uri"

module Jekyll
  class TargetBlank
    BODY_START_TAG         = "<body"
    OPENING_BODY_TAG_REGEX = %r!<body([^<>]*)>\s*!.freeze

    class << self
      # Public: Processes the content and updated the external links
      # by adding target="_blank" and rel="noopener noreferrer" attributes.
      #
      # content - the document or page to be processes.
      def process(content)
        @site_url                              = content.site.config["url"]
        @config                                = content.site.config
        @target_blank_config                   = class_config
        @requires_specified_css_class          = false
        @required_css_class_name               = nil
        @should_add_css_classes                = false
        @css_classes_to_add                    = nil
        @should_add_noopener                   = true
        @should_add_noreferrrer                = true
        @should_add_extra_rel_attribute_values = false
        @extra_rel_attribute_values            = nil

        return unless content.output.include?("<a")

        initialise

        content.output = if content.output.include? BODY_START_TAG
                           process_html(content)
                         else
                           process_anchor_tags(content.output)
                         end
      end

      # Public: Determines if the document should be processed.
      #
      # doc - the document being processed.
      def document_processable?(doc)
        (doc.is_a?(Jekyll::Page) || doc.write?) &&
          doc.output_ext == ".html" || (doc.permalink&.end_with?("/"))
      end

      private

      def initialise
        requires_css_class_name
        configure_adding_additional_css_classes
        add_default_rel_attributes?
        add_extra_rel_attributes?
      end

      # Private: Processes html content which has a body opening tag.
      #
      # content - html to be processes.
      def process_html(content)
        head, opener, tail  = content.output.partition(OPENING_BODY_TAG_REGEX)
        body_content, *rest = tail.partition("</body>")

        processed_markup = process_anchor_tags(body_content)

        content.output = String.new(head) << opener << processed_markup << rest.join
      end

      # Private: Processes the anchor tags and adds the target
      # attribute if the link is external and depending on the config settings.
      #
      # html = the html which includes the anchor tags.
      def process_anchor_tags(html)
        content = Nokogiri::HTML::DocumentFragment.parse(html)
        anchors = content.css("a[href]")
        anchors.each do |item|
          if processable_link?(item)
            add_target_blank_attribute(item)
            add_rel_attributes(item)
            add_css_classes_if_required(item)
            add_data_vars_event_label_attributes(item)
          end
          next
        end
        content.to_html
      end

      # Private: Determines of the link should be processed.
      #
      # link = Nokogiri node.
      def processable_link?(link)
        if not_mailto_link?(link["href"]) && external?(link["href"])
          if @requires_specified_css_class
            return false unless includes_specified_css_class?(link)
          end
          true
        end
      end

      # Private: Handles adding the target attribute of the config
      # requires a specifies class.
      def requires_css_class_name
        if css_class_name_specified_in_config?
          @requires_specified_css_class = true
          @required_css_class_name      = specified_class_name_from_config
        end
      end

      # Private: Configures any additional CSS classes
      # if needed.
      def configure_adding_additional_css_classes
        if should_add_css_classes?
          @should_add_css_classes = true
          @css_classes_to_add     = css_classes_to_add_from_config.to_s
        end
      end

      # Private: Handles the default rel attribute values
      def add_default_rel_attributes?
        @should_add_noopener = false if should_not_include_noopener?

        @should_add_noreferrrer = false if should_not_include_noreferrer?
      end

      # Private: Sets any extra rel attribute values
      # if required.
      def add_extra_rel_attributes?
        if should_add_extra_rel_attribute_values?
          @should_add_extra_rel_attribute_values = true
          @extra_rel_attribute_values            = extra_rel_attribute_values_to_add
        end
      end

      # Private: adds the cs classes if set in config.
      #
      # link = Nokogiri node.
      def add_css_classes_if_required(link)
        if @should_add_css_classes
          existing_classes = get_existing_css_classes(link)
          existing_classes = " " + existing_classes unless existing_classes.to_s.empty?
          link["class"] = @css_classes_to_add + existing_classes
        end
      end

      # Private: Adds a target="_blank" to the link.
      #
      # link = Nokogiri node.
      def add_target_blank_attribute(link)
        link["target"] = "_blank"
      end

      # Private: Adds the rel attribute and values to the link.
      #
      # link = Nokogiri node.
      def add_rel_attributes(link)
        rel = ""
        rel = add_noopener_to_rel(rel)

        if @should_add_noreferrrer
          rel += " " unless rel.empty?
          rel += "noreferrer"
        end

        if @should_add_extra_rel_attribute_values
          rel += " " unless rel.empty?
          rel += @extra_rel_attribute_values
        end

        link["rel"] = rel unless rel.empty?
      end

      # Private: Adds noopener attribute.
      #
      # rel = string
      def add_noopener_to_rel(rel)
        if @should_add_noopener
          rel += " " unless rel.empty?
          rel += "noopener"
        end
        rel
      end

      # Private: Adds the data-vars-event-label and values to the link.
      #
      # link = Nokogiri node.             
      def add_data_vars_event_label_attributes(link)
        link["data-vars-event-label"] = link["href"]
      end

      # Private: Checks if the link is a mailto url.
      #
      # link - a url.
      def not_mailto_link?(link)
        true unless link.to_s.start_with?("mailto:")
      end

      # Private: Checks if the links points to a host
      # other than that set in Jekyll's configuration.
      #
      # link - a url.
      def external?(link)
        if link&.match?(URI.regexp(%w(http https)))
          URI.parse(link).host != URI.parse(@site_url).host
        end
      end

      # Private: Checks if a css class name is specified in config
      def css_class_name_specified_in_config?
        target_blank_config = @target_blank_config
        case target_blank_config
        when nil, NilClass
          false
        else
          target_blank_config.fetch("css_class", false)
        end
      end

      # Private: Checks if the link contains the same css class name
      # as specified in config.
      #
      # link - the url under test.
      def includes_specified_css_class?(link)
        link_classes = get_existing_css_classes(link)
        if link_classes
          link_classes = link_classes.split(" ")
          contained    = false
          link_classes.each do |name|
            contained = true unless name != @required_css_class_name
          end
          return contained
        end
        false
      end

      # Private: Gets the the css classes of the link.
      #
      # link - an anchor tag.
      def get_existing_css_classes(link)
        link["class"].to_s
      end

      # Private: Checks if the link contains the class attribute.
      #
      # link - an anchor tag.
      def link_has_class_attribute?(link)
        link.include?("class=")
      end

      # Private: Fetches the specified css class name
      # from config.
      def specified_class_name_from_config
        target_blank_config = @target_blank_config
        target_blank_config.fetch("css_class")
      end

      # Private: Checks if it should add additional CSS classes.
      def should_add_css_classes?
        config = @target_blank_config
        case config
        when nil, NilClass
          false
        else
          config.fetch("add_css_classes", false)
        end
      end

      # Private: Checks if any addional rel attribute values
      # should be added.
      def should_add_extra_rel_attribute_values?
        config = @target_blank_config
        case config
        when nil, NilClass
          false
        else
          config.fetch("rel", false)
        end
      end

      # Private: Gets any additional rel attribute values
      # values to add from config.
      def extra_rel_attribute_values_to_add
        config = @target_blank_config
        config.fetch("rel")
      end

      # Private: Gets the CSS classes to be added to the link from
      # config.
      def css_classes_to_add_from_config
        config = @target_blank_config
        config.fetch("add_css_classes")
      end

      # Private: Determines if the noopener rel attribute value should be added
      # based on the specified config values.
      #
      # Returns true if noopener is false in config.
      def should_not_include_noopener?
        config = @target_blank_config
        case config
        when nil, NilClass
          false
        else
          noopener = config.fetch("noopener", true)
          if noopener == false
            return true
          else
            return false
          end
        end
      end

      # Private: Determines if the noreferrer rel attribute value should be added
      # based on the specified config values.
      #
      # Returns true if noreferrer is false in config.
      def should_not_include_noreferrer?
        config = @target_blank_config
        case config
        when nil, NilClass
          false
        else
          noreferrer = config.fetch("noreferrer", true)
          if noreferrer == false
            return true
          else
            return false
          end
        end
      end

      # Private: Gets the relative config values
      # if they exist.
      def class_config
        @target_blank_config = @config.fetch("target-blank", nil)
      end
    end
  end
end

# Hooks into Jekyll's post_render event.
Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  Jekyll::TargetBlank.process(doc) if Jekyll::TargetBlank.document_processable?(doc)
end