FactoryGirl.define do
  factory :course do
    name 'My Course'
  end

  factory :lesson do
    course
    sequence(:name) { |n| "Lesson #{n}" }
  end
end