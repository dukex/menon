module Courses
  class ImportJob < ApplicationJob
    queue_as :importation

    def perform(course)
      course.importing!
      course.provider.import!
      course.imported!
    rescue Yt::Errors::Forbidden => e
      course.retry_soon!
      raise e
    rescue StandardError => e
      course.error!
    end
  end
end
