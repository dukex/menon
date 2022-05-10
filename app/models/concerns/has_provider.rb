module HasProvider
  def provider
    @provider ||= Providers::Youtube.new(course: self)
  end
end
