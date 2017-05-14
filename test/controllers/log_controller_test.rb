require 'test_helper'

class LogControllerTest < ActionDispatch::IntegrationTest
  test "should get view" do
    get log_view_url
    assert_response :success
  end

end
