\name{detectnormoutlier}
\alias{detectnormoutlier}
%- Also NEED an '\alias' for EACH other topic documented here.
\title{
freiesMagazin - detectnormoutlier()
}
\description{
%%  ~~ A concise (1-5 lines) description of what the function does. ~~
}
\usage{
detectnormoutlier(n, alpha = 0.05)
}
%- maybe also 'usage' for other objects documented here.
\arguments{
  \item{n}{
%%     ~~Describe \code{n} here~~
}
  \item{alpha}{
%%     ~~Describe \code{alpha} here~~
}
}
\details{
%%  ~~ If necessary, more details than the description above ~~
}
\value{
%%  ~Describe the value returned
%%  If it is a LIST, use
%%  \item{comp1 }{Description of 'comp1'}
%%  \item{comp2 }{Description of 'comp2'}
%% ...
}
\references{
%% ~put references to the literature/web site here ~
}
\author{
%%  ~~who you are~~
}
\note{
%%  ~~further notes~~
}

%% ~Make other sections like Warning with \section{Warning }{....} ~

\seealso{
%% ~~objects to See Also as \code{\link{help}}, ~~~
}
\examples{
##---- Should be DIRECTLY executable !! ----
##-- ==>  Define data, use random,
##--	or do  help(data=index)  for the standard data sets.

## The function is currently defined as
function (n) 
{
    x = rnorm(n)
    alpha.new.1 = 1 - (1 - 0.01)^(1/length(x))
    alpha.new.5 = 1 - (1 - 0.05)^(1/length(x))
    m.out.loc = sample(1:n, 5)
    x[m.out.loc] = x[m.out.loc] + sign(x[m.out.loc]) * qnorm(1 - 
        alpha.new.5)
    l.out.loc = sample(setdiff(c(1:n), m.out.loc), 5)
    x[l.out.loc] = x[l.out.loc] + sign(x[l.out.loc]) * qnorm(1 - 
        alpha.new.1)
    temp.mean = median(x)
    temp.sd = mad(x)
    temp.data = (x - temp.mean)/temp.sd
    temp.norm.p = pnorm(temp.data)
    out1 = which(temp.norm.p > 1 - alpha.new.5 | temp.norm.p < 
        alpha.new.5)
    out2 = which(temp.norm.p > 1 - alpha.new.1 | temp.norm.p < 
        alpha.new.1)
    output <- list()
    output[[1]] <- cbind((1:n)[-out1], x[-out1])
    output[[2]] <- cbind((1:n)[out1], x[out1])
    output[[3]] <- cbind((1:n)[setdiff(out1, out2)], x[setdiff(out1, 
        out2)])
    output[[4]] <- cbind((1:n)[out2], x[out2])
    return(output)
  }
}
% Add one or more standard keywords, see file 'KEYWORDS' in the
% R documentation directory.
\keyword{ ~kwd1 }
\keyword{ ~kwd2 }% __ONLY ONE__ keyword per line
