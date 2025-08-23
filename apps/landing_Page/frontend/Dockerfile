# Use the Nginx image
FROM nginx:alpine

# Copy your built frontend files from dist folder to Nginx's HTML directory
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
