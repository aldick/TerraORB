import pandas as pd
if __name__ == '__main__':
    from models import PHA 
else: 
    from .models import PHA

csv_file_path = "pha.csv"
df = pd.read_csv(csv_file_path)

for index, row in df.iterrows():
    pha = PHA(
            name = row['full_name'],
            a = row['a'],
            i = row['i'],
            node = row['om'],
            peri = row['w'],
            q = row['q'],
            QQ = row['ad'],
            period = row['per_y'],
            H = row['H'],
            diameter = row['diameter'],
            M = row['ma'],
            tp = row['tp'],
    )
    pha.save()