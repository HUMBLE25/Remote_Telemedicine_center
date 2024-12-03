import os

def list_directory_structure(directory, indent=0):
    """현재 디렉터리의 구조를 출력하며 node_modules 디렉터리는 제외합니다."""
    try:
        items = os.listdir(directory)
        for item in items:
            item_path = os.path.join(directory, item)
            # node_modules 디렉터리를 제외
            if item in {"node_modules", ".git"}:
                continue
            print(" " * indent + "|-- " + item)
            if os.path.isdir(item_path):
                list_directory_structure(item_path, indent + 4)
    except PermissionError:
        print(" " * indent + "|-- [Permission Denied]")
    except Exception as e:
        print(" " * indent + f"|-- [Error: {str(e)}]")

if __name__ == "__main__":
    current_directory = os.getcwd()
    print(f"Current Directory: {current_directory}")
    print("Directory Structure:")
    list_directory_structure(current_directory)
