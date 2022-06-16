task restart: :environment do
  Courses::Homepage.refresh
  Courses::Category.refresh
end
