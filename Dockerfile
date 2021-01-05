FROM ubuntu

COPY go1.15.6.linux-amd64.tar.gz /go/
COPY yubbe-server/ /


ENV PATH=$PATH:/usr/local/go/bin
ENV GOPATH=$PATH:/volume 

RUN tar -C /usr/local -xzf /go/go1.15.6.linux-amd64.tar.gz 
RUN chmod +x ./yubbe-server
CMD ./yubbe-server


VOLUME [ "/volume" ]

EXPOSE 80