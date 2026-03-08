import "./progress.css"

type Props = {
  uploaded: number
  total: number
}

export default function ProgressBar({ uploaded, total }: Props) {

  const percent = total ? (uploaded / total) * 100 : 0

  const progressText =
    uploaded === total
      ? "All required documents uploaded"
      : `${uploaded} of ${total} required documents uploaded`

  return (

    <div className="progress-card">

      <div className="progress-header">

        <div>

          <h3>Document Upload Progress</h3>

          <p>
            Track your required document submissions
          </p>

        </div>

        <div className="progress-count">

          <span>{uploaded}</span>

          <p>of {total} required</p>

        </div>

      </div>

      <div className="bar">

        <div
          style={{ width: `${percent}%` }}
          className="bar-fill"
        ></div>

      </div>

      <p className="progress-text">
        {progressText}
      </p>

    </div>

  )
}