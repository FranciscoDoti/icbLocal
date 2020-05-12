FROM node:10.15.3

LABEL AUTHOR="Francisco Doti Texeira (franciscodotitexeira@gmail.com)"
COPY ./ ./
RUN mkdir /downloads
RUN npm install
#EXPOSE 3000

#CMD ["npm", "run", "test"]