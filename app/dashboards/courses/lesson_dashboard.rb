require 'administrate/base_dashboard'

class Courses::LessonDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    course: Field::BelongsTo,
    id: Field::String,
    name: Field::String,
    description: Field::Text,
    position: Field::Number,
    duration: Field::Number,
    published_at: Field::Date,
    thumbnail_url: Field::String,

    type: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    provider_id: Field::String,

    slug: Field::String
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    name
    course
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys

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
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how lessons are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(lesson)
  #   "Courses::Lesson ##{lesson.id}"
  # end
end
