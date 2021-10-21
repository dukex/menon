require 'importer/youtube'

namespace :courses do
  desc 'Update courses'
  task update: :environment do
    Course.find_each do |course|
      puts "##{course.id}"
      Importer::Youtube.update! course.id
    end
  end
end
