import os

# Directory containing the images
image_directory = os.getcwd()

# Loop through all files in the directory
for filename in os.listdir(image_directory):
    # Check if the file has the '-400x400' part in the name
    if "-400x400" in filename:
        # Create the new filename by replacing '-400x400' with an empty string
        new_filename = filename.replace("-400x400", "")

        # Get full paths
        old_path = os.path.join(image_directory, filename)
        new_path = os.path.join(image_directory, new_filename)

        # Rename the file
        os.rename(old_path, new_path)
        print(f"Renamed: {old_path} -> {new_path}")
