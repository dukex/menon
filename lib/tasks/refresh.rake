task refresh: :environment do
  Courses::Homepage.refresh
  Courses::Category.refresh
  Courses::Search.refresh
end
