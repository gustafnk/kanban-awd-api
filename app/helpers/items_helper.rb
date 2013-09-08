module ItemsHelper
  def get_classes classes_string
    if (not web?)
      classes = classes_string.split(' ')
      classes.select {|c| c.match('^[hp]-') }.join(' ')
    else
      classes_string
    end
  end

  def web?
    Rails::Server.new.options[:Port] != 3001 && !request.host.match("api")
  end

end
