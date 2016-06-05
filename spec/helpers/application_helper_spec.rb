require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do
  it "#body_classes returns controller and action" do
    allow(helper).to receive(:controller_name) { 'test_controller' }
    allow(helper).to receive(:action_name) { 'post' }

    expect(helper.body_classes).to eq("test_controller post")
  end
end
