class SitemapController < ApplicationController
  def index
    map = XmlSitemap::Map.new('www.menon.courses') do |m|
      m.add '/'

      Course.includes(:lessons).all.map do |course|
        m.add course_path(course), updated: course.updated_at, priority: 0.5

        course.lessons.all.map do |lesson|
          m.add course_lesson_path(course, lesson),
            updated: lesson.updated_at,
            priority: 0.9,
            video_thumbnail_location: lesson.thumbnail_url,
            video_title: lesson.name,
            video_description: lesson.description,
            video_content_location: course_lesson_url(course, lesson),
            video_duration: lesson.duration,
            video_publication_date: lesson.published_at
        end
      end
    end.render

    render xml: map
  end
end
