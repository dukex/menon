module Courses
  class Lesson < ActiveRecord::Base
    extend FriendlyId
    friendly_id :name, use: :slugged

    belongs_to :course
    validates :course_id, presence: true

    # def status_for(user)
    #   lesson_status_for(user) || new_lesson_status_for(user)
    # end

    # def finish!(user)
    #   status = status_for(user)
    #   status.finish! if status
    # end

    # private

    # def lesson_status_for(user)
    #   LessonStatus.where(user_id: user.id, lesson_id: id).first
    # end

    # def new_lesson_status_for(user)
    #   LessonStatus.new lesson_id: id, user_id: user.id, time: 1
    # end
  end
end
