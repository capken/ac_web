gulp deploy
tar -zcvf  public.tar.gz web/public
scp public.tar.gz iqingxin.cn:/home/allen/codes/ac_web/
ssh iqingxin.cn "cd /home/allen/codes/ac_web/ && tar -xvf public.tar.gz"
rm public.tar.gz 
