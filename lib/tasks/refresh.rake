task refresh: :environment do
  Courses::Homepage.refresh
  Courses::Category.refresh
end
