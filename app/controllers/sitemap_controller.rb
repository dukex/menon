# frozen_string_literal: true

class SitemapController < ApplicationController
  PER_PAGE = 5000.0

  def index
    @pages = [
      { type: :courses, count: (all_courses.count / PER_PAGE).ceil - 1 },
      { type: :lessons, count: (all_lessons.count / PER_PAGE).ceil - 1 }
    ]
  end

  def show
    records = case params[:type].to_sym
              when :courses
                all_courses
              when :lessons
                all_lessons
              end

    @items = records.offset(params[:page].to_i * PER_PAGE).limit(PER_PAGE)
  end

  private

  def all_courses
    Course.reviewed.order('updated_at DESC')
  end

  def all_lessons
    Courses::Lesson
      .includes(:course)
      .where(course: { status: :reviewed })
      .where.not(course: { id: nil })
      .order('courses_lessons.updated_at DESC')
  end
end
