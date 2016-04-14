class Lesson < ActiveRecord::Base
  belongs_to :course

  def status_for(user)
    LessonStatus.where(user_id: user.id, lesson_id: id).first_or_create!
  end

  def finish(user)
    status_for(user).finish!
  end
end
