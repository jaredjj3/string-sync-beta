json.array! @notations do |notation|
  json.id             notation.id
  json.createdAt      notation.created_at.to_date.to_s(:long)
  json.song_name      notation.song_name
  json.duration_ms    notation.duration_ms
  json.artist_name    notation.artist_name
  json.thumbnail_url  notation.thumbnail.url
  json.tags           notation.tags.map(&:name)
  json.transcriber do
    transcriber = notation.transcriber
    json.id       transcriber.id
    json.username transcriber.username
    json.email    transcriber.email
  end

  if logged_in? && current_user.has_role?(:admin)
    json.featured notation.featured
  end
end
