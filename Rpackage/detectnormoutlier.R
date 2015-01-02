detectnormoutlier <-
function(n, alpha=0.05){
  
  x=rnorm(n)
  alpha.new.1=1-(1-0.01)^(1/length(x))  # Bonferoni Correction
  alpha.new.5=1-(1-0.05)^(1/length(x)) 
  ### location mild / large outliers:
  m.out.loc=sample(1:n, 5)
  x[m.out.loc]=x[m.out.loc]+sign(x[m.out.loc])*qnorm(1-alpha.new.5)   # create the outliers
  
  ##### 
  l.out.loc=sample(setdiff(c(1:n), m.out.loc), 5)
  x[l.out.loc]=x[l.out.loc]+sign(x[l.out.loc])*qnorm(1-alpha.new.1)
  
  

  temp.mean=median(x)  
  temp.sd=mad(x )     
  temp.data=(x-temp.mean)/temp.sd # standartisation of the data
  temp.norm.p=pnorm(temp.data)# probability transformation
  out1=which(temp.norm.p>1-alpha.new.5 | temp.norm.p<alpha.new.5)
  out2=which(temp.norm.p>1-alpha.new.1 | temp.norm.p<alpha.new.1)
  output<-list()
  output[[1]]<-cbind(   (1:n)[-out1], x[-out1]  )
  output[[2]]<-cbind(   (1:n)[out1], x[out1] )     ## all outliers
  output[[3]]<-cbind(   (1:n)[setdiff(out1,out2)], x[setdiff(out1,out2)]   )    ## mild outliers
  output[[4]]<-cbind(   (1:n)[out2], x[out2] )     ##  large outlers
  return(output)
}
