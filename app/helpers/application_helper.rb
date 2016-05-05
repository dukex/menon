module ApplicationHelper
  def body_classes
    "#{controller_name} #{action}"
  end

  def action
    params[:action]
  end
end
