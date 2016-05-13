class Lesson < ActiveRecord::Base
  belongs_to :course
  has_many :statuses, class_name: 'LessonStatus', dependent: :destroy

  def status_for(user)
    LessonStatus.where(user_id: user.id, lesson_id: id).first_or_create!
  end

  def finish!(user)
    status_for(user).finish!
  end
end
