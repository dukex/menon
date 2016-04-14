class Lesson < ActiveRecord::Base
  belongs_to :course

  def status_for(user)
    LessonStatus.first_or_create user: user, lesson: self
  end

  def finish(user)
    status_for(user).finish!
  end
end
