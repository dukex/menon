[
  ['https://www.youtube.com/playlist?list=PLUl4u3cNGP63EdVPNLG3ToM6LaEUuStEY', '6006'],
  ['https://www.youtube.com/playlist?list=PLUl4u3cNGP63WbdFxL8giv4yhgdMGaZNA', '60001'],
  ['https://www.youtube.com/playlist?list=PLUl4u3cNGP619EG1wp0kT-7rDE_Az5TNd', '60002'],
  ['https://www.youtube.com/playlist?list=PL9B24A6A9D5754E70', '601SC'],
  ['https://www.youtube.com/playlist?list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp', '6046J'],
  ['https://www.youtube.com/playlist?list=PLUl4u3cNGP63UUkfL0onkxF6MYgVa04Fn', '15S12']
].each do |playlist|
  Course.create! name: playlist.last, source_url: playlist.first
end
