module ApplicationHelper
  def body_classes
    "#{controller_name} #{action_name}"
  end

  def nav_class(url)
    current_page?(url) ? 'active' : ''
  end

  def languages_select(languages)
    select 'q', 'language_eq',
          languages.collect {|l| [translate_language(l), l]},
          { include_blank: true },
          { onchange: "this.form.submit()" }
  end

  def translate_language(lang)
    {
      pt: "Português",
      en: "English",
      es: "Español"
    }[lang.to_sym]
  end
end
