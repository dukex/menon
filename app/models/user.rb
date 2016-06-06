class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable#, :confirmable

  has_many :courses, foreign_key: :owner_id
  has_many :lesson_statuses

  def enrollments
    Course.select('distinct courses.*').
      joins(:lessons).
      joins('JOIN lesson_statuses s ON s.lesson_id = lessons.id').
      where('s.user_id = ?', id)
  end
end
