# frozen_string_literal: true

require 'administrate/base_dashboard'

class CourseDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::String,
    slug: Field::String,
    name: Field::String,
    status: Field::Select.with_options(collection: Course.statuses.keys),
    language: Field::String,
    description: Field::Text,
    source_url: Field::String,
    thumbnail_url: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    owner_id: Field::String,
    lessons: Field::HasMany.with_options(limit: 1000, direction: :desc, sort_by: :created_at,
                                         class_name: 'Courses::Lesson')
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    slug
    name
    status
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys - %i[created_at updated_at owner lessons]

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {
    importing: ->(resources) { resources.where(status: :importing) }
  }
  # Overwrite this method to customize how courses are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(course)
    course.name.to_s
  end

  def import_page_attributes
    [:status]
  end
end
