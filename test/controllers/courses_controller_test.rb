require 'test_helper'

class CoursesControllerTest < ActionController::TestCase
  setup do
    @course = create(:course)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:courses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create course" do
    assert_difference('Course.count') do
      post :create, course: { name: @course.name }
    end

    assert_redirected_to course_path(assigns(:course))
  end

  test "should not create course with name" do
    assert_no_difference('Course.count') do
      post :create, course: { name: nil }
    end

    assert_template :new
  end

  test "should show course" do
    get :show, id: @course
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @course
    assert_response :success
  end

  test "should update course" do
    patch :update, id: @course, course: { name: @course.name }
    assert_redirected_to course_path(assigns(:course))
  end

  test "should destroy course" do
    assert_difference('Course.count', -1) do
      delete :destroy, id: @course
    end

    assert_redirected_to courses_path
  end

  test "should import youtube playlist" do
    VCR.use_cassette("youtube-playlist") do
      playlist_url = "https://www.youtube.com/playlist?list=PLSKbCQY095R4jp6PoFulCDLYIzzdbD1DI"

      assert_difference('@course.lessons.count', 123) do
        post :import_youtube, url: playlist_url, id: @course.id
      end

      assert_redirected_to course_path(@course)
    end
  end
end
