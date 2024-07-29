class Courses::HomepageListDecorator < Draper::CollectionDecorator
  def featured
    groupped.fetch('featured', [])
  end

  def latest
    groupped.fetch('latest', [])
  end

  def top_categories
    groupped.fetch('top_categories', []).group_by(&:category)
  end

  def featured?
    featured.present?
  end

  private

  def groupped
    object.map(&:decorate).group_by(&:section)
  end
end
