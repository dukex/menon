class CourseDecorator < Draper::Decorator
  delegate :section, :slug, :thumbnail_url, :name, :description, :creator_name, :creator_url, :category,
           :lessons_ordered

  def lessons_count
    @lessons_count ||= object.respond_to?(:lessons_count) ? object.lessons_count : lessons_ordered.to_a.size
  end

  HOURS_IN_SECONDS = 3600

  def hours
    @hours ||= object.respond_to?(:hours) ? object.hours : lessons_ordered.map(&:duration).sum / HOURS_IN_SECONDS
  end
end
