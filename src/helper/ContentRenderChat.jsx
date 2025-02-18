const renderContentByType = (each) => {
    switch (each?.content_type) {
        case "image":
            return <img src={each?.doc_url} alt="Uploaded" height={100} width={100} />;
        case "video":
            return (
                <video src={each?.doc_url} controls height={100} width={100}>
                    Your browser does not support the video tag.
                </video>
            );
        case "audio":
            return (
                <audio src={each?.doc_url} controls>
                    Your browser does not support the audio element.
                </audio>
            );
        case "document":
            return (
                <a href={each?.doc_url} target="_blank" rel="noopener noreferrer">
                    View Document
                </a>
            );
        default:
            return <div className="message-text">{each?.content}</div>;
    }
};

export default renderContentByType