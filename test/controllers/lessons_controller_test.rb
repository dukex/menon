require 'test_helper'

class LessonsControllerTest < ActionController::TestCase
  setup do
    @lesson = create(:lesson)
  end

  test "should create lesson" do
    assert_difference('Lesson.count') do
      post :create, course_id: @lesson.course_id, lesson: { name: @lesson.name, type: @lesson.type }, format: :json
    end

    assert_response :success
  end

  test "should show lesson" do
    get :show, id: @lesson, course_id: @lesson.course_id, format: :json
    assert_response :success
  end

  test "should update lesson" do
    patch :update, id: @lesson, course_id: @lesson.course_id, lesson: { name: @lesson.name }, format: :json
    assert_response :success
  end

  test "should destroy lesson" do
    assert_difference('Lesson.count', -1) do
      delete :destroy, id: @lesson, course_id: @lesson.course_id, format: :json
    end

    assert_response :success
  end
end
