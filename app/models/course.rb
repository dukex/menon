# frozen_string_literal: true

class Course < ApplicationRecord
  include HasProvider

  has_many :lessons, class_name: 'Courses::Lesson'

  validates :status, presence: true

  enum status: {
    created: :created, error: :error, importing: :importing, imported: :imported, reviewed: :reviewed
  }

  # on        status
  # create: - created
  # import: - imported
  #         - error

  # created
  # importing
  # imported
  # reviewed
  #
  def start_importation!
    if can?(:import)
      importing!
      Courses::ImportJob.perform_later self
    end
  end

  def can?(target)
    case target
    when :import
      [:created, :error, nil].include?(status)
    end
  end
end
