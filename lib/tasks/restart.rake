task restart: :environment do
  Courses::Category.refresh
end
