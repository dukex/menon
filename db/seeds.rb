PLAYLISTS = [
  "youtube.com/playlist?list=PLF2J-8QoLzYGj08pCRhjb_1hTl8R1LJjJ",
  "youtube.com/playlist?list=PLWVIs26n5ziC8QgkkDDC4zKHIJ5F_hMMz",
  "youtube.com/playlist?list=PLD6DA5E296071FDB3",
  "youtube.com/playlist?list=PLSG_IHPERQrX_wS-2tJQq--z9LJ8IXMhH",
  "youtube.com/playlist?list=PLhgGa5awm26NjVjniyuIG19xwUEe48Vyt",
  "youtube.com/playlist?list=PL-5888xShjYrLX_N42w4EHq-A4_p1YZeP"
]

User.all.map(&:destroy)
Course.all.map(&:destroy)

user = User.create! email: 'user@user.com', password: 'abc12345'
user.confirm!

PLAYLISTS.each do |url|
  Course.import_from_youtube url, user
end
