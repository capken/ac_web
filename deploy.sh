grunt build
tar -zcvf  public.tar.gz web/public
scp public.tar.gz mapclipper.com:/home/allen/codes/ac_web/
ssh mapclipper.com "cd /home/allen/codes/ac_web/ && tar -xvf public.tar.gz"
rm public.tar.gz 
