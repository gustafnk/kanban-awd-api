json.array!(@items) do |item|
  json.extract! item, :title, :description, :status
  json.url item_url(item, format: :json)
end
