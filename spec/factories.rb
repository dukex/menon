FactoryGirl.define do
  factory :course do
    name 'My Course'
  end

  factory :lesson do
    course
    sequence(:name) { |n| "Lesson #{n}" }
  end

  factory :lesson_status do
    time 1
    user
    lesson
  end

  factory :user do
    sequence(:email) { |n| "email#{n}@email.com" }
    password 12345678
    confirmed_at Date.today
  end
end
