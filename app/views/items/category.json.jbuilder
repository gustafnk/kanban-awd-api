json.array!(@items) do |item|
  json.extract! item, :title, :description
  json.url item_url(item, format: :json)
end
