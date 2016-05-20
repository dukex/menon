require 'importer/youtube'

namespace :courses do
  desc 'Update courses'
  task update: :environment do
    Course.all.map do |course|
      Importer::Youtube.update! course.id
    end
  end
end
