# Use official OpenJDK image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy Maven wrapper and project files
COPY . .

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/sudoku-0.0.1-SNAPSHOT.jar"]
