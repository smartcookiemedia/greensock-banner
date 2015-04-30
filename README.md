# greensock-banner
Proof of concept video > spritesheet conversion and using greensock to accelerate spritesheet animation.  Works on mobile too!


Image compression and sprite sheet:

http://www.imagemagick.org/
https://www.ffmpeg.org/

scale=300:-1 -> width 300, keep aspect ratio



Run command:


ffmpeg -i input.mp4  -r 10  -qscale:v 2  img_%03d.jpg ;

files=$(ls img*.jpg | sort -t '-' -n -k 2 | tr '\n' ' ');

convert $files -append output.jpg;
convert output.jpg -quality 75% -depth 4 output.jpg

Note: param (-r = framerate)
 -depth 4 = channel depth

convert -strip -interlace Plane -quality 75% output.jpg result.jpg


* PNG *

ffmpeg -i input.mp4  -r 10  -qscale:v 2  img_%03d.png ;
files=$(ls img*.png | sort -t '-' -n -k 2 | tr '\n' ' ');
convert $files -append -quality 75% -depth 8 output.png;
convert output.jpg -quality 75% -depth 4 output.jpg
