module Courses
  class ImportJob < ApplicationJob
    queue_as :importation

    def perform(course)
      course.importing!
      course.provider.import!
      course.imported!
    rescue StandardError => e
      course.error!
      raise e
    end
  end
end
