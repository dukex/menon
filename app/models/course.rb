# frozen_string_literal: true

class Course < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  include HasProvider

  has_many :lessons, class_name: 'Courses::Lesson'

  enum status: {
    created: 'created',
    error: 'error',
    importing: 'importing',
    imported: 'imported',
    reviewed: 'reviewed'
  }

  def lessons_ordered
    lessons.order('position ASC')
  end

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
      created? || error? || status.nil?
    end
  end
end
