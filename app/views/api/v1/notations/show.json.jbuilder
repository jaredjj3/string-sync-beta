json.id               @notation.id
json.song_name        @notation.song_name
json.artist_name      @notation.artist_name
json.thumbnail_url    @notation.thumbnail.url
json.tags             @notation.tags.map(&:name)
json.vextab_string    @notation.vextab_string
json.youtube_video_id @notation.youtube_video_id
json.duration_ms      @notation.duration_ms
json.dead_time_ms     @notation.dead_time_ms
json.bpm              @notation.bpm
json.featured         @notation.featured

json.transcriber do
  transcriber = @notation.transcriber
  json.id       transcriber.id
  json.username transcriber.username
  json.email    transcriber.email
end
